package com.aquent.crudapp.person;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.aquent.crudapp.shared.Address;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring JDBC implementation of {@link PersonDao}.
 */
@Component
public class JdbcPersonDao implements PersonDao {

    private static final String SQL_LIST_PEOPLE = "SELECT * FROM person ORDER BY first_name, last_name, person_id";
    private static final String SQL_READ_PERSON = "SELECT * FROM person WHERE person_id = :personId";
    private static final String SQL_DELETE_PERSON = "DELETE FROM person WHERE person_id = :personId";
    private static final String SQL_UPDATE_PERSON = "UPDATE person SET (first_name, last_name, email_address, street_address, city, state, zip_code, client_id)"
                                                  + " = (:firstName, :lastName, :emailAddress, :address.streetAddress, :address.city, :address.state, :address.zipCode, :clientId)"
                                                  + " WHERE person_id = :personId";
    private static final String SQL_CREATE_PERSON = "INSERT INTO person (first_name, last_name, email_address, street_address, city, state, zip_code, client_id)"
                                                  + " VALUES (:firstName, :lastName, :emailAddress, :address.streetAddress, :address.city, :address.state, :address.zipCode, :clientId)";
    private static final String SQL_LIST_CONTACTS = "SELECT * FROM person WHERE client_id = :clientId";
    private static final String SQL_READ_CLIENT_NAME ="SELECT company_name FROM client WHERE client_id = :clientId";

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public JdbcPersonDao(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public List<Person> listPeople() {
        List<Person> people = namedParameterJdbcTemplate.getJdbcOperations().query(SQL_LIST_PEOPLE, new PersonRowMapper());

        for (Person person : people) {
            Integer clientId = person.getClientId();
            if(clientId > 0){
                Map<String, Integer> parameters = new HashMap<String, Integer>();
                parameters.put("clientId", clientId);
                String clientName = namedParameterJdbcTemplate.queryForObject(SQL_READ_CLIENT_NAME, parameters, String.class);
                person.setClientName(clientName);
            }
        }
        return people;
    }

    @Override
    public List<Person> listContacts(Integer clientId) {
        Map<String, Integer> parameters = new HashMap<String, Integer>();
        parameters.put("clientId", clientId);
        List<Person> people = namedParameterJdbcTemplate.query(SQL_LIST_CONTACTS, parameters, new PersonRowMapper());
        return people;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public Person readPerson(Integer personId) {
        Person person = namedParameterJdbcTemplate.queryForObject(SQL_READ_PERSON, Collections.singletonMap("personId", personId), new PersonRowMapper());
        if (person.getClientId() > 0){
            Map<String, Integer> parameters = new HashMap<String, Integer>();
            parameters.put("clientId", person.getClientId());
            String clientName = namedParameterJdbcTemplate.queryForObject(SQL_READ_CLIENT_NAME, parameters, String.class);
            person.setClientName(clientName);
        }
        return person;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public void deletePerson(Integer personId) {
        namedParameterJdbcTemplate.update(SQL_DELETE_PERSON, Collections.singletonMap("personId", personId));
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public void updatePerson(Person person) {
        namedParameterJdbcTemplate.update(SQL_UPDATE_PERSON, new BeanPropertySqlParameterSource(person));
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public Integer createPerson(Person person) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(SQL_CREATE_PERSON, new BeanPropertySqlParameterSource(person), keyHolder);
        return keyHolder.getKey().intValue();
    }

    /**
     * Row mapper for person records.
     */
    public static final class PersonRowMapper implements RowMapper<Person> {

        @Override
        public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
            Person person = new Person();
            Address address = new Address();
            address.setStreetAddress((rs.getString("street_address")));
            address.setCity(rs.getString("city"));
            address.setZipCode(rs.getString("zip_code"));
            address.setState(rs.getString("state"));
            person.setPersonId(rs.getInt("person_id"));
            person.setFirstName(rs.getString("first_name"));
            person.setLastName(rs.getString("last_name"));
            person.setEmailAddress(rs.getString("email_address"));
            person.setAddress(address);
            person.setClientId(rs.getInt("client_id"));
            return person;
        }
    }
}
