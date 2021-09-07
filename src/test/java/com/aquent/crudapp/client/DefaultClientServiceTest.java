//package com.aquent.crudapp.client;
//
//import com.aquent.crudapp.person.Person;
//import com.aquent.crudapp.person.PersonDao;
//import com.aquent.crudapp.shared.Address;
//import org.hibernate.validator.internal.engine.ValidatorImpl;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.MockitoJUnitRunner;
//import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
//
//
//import javax.validation.Validator;
//import java.util.List;
//
//public class DefaultClientServiceTest {
//
//    @Mock
//    private NamedParameterJdbcTemplate template;
//    @Mock
//    private Validator validator;
//    @Mock
//    private PersonDao personDao;
//    @Mock
//    private ClientDao clientDao;
//    @InjectMocks
//    DefaultClientService clientService = new DefaultClientService(clientDao, personDao, validator);
//
//    private Client client;
//    private Person person;
//    private Address address;
//
//    List<Client> testClient() {
//        client = new Client();
//        address = new Address();
//        client.setClientId(1);
//        address.setStreetAddress("110 Bear Creek");
//        address.setCity("Asheville");
//        address.setState("NC");
//        address.setZipCode("12345");
//        client.setCompanyName("Up Country");
//        client.setWebsiteUri("www.upcountry.com");
//        client.setPhoneNumber("9288563213");
//
//        List<Client> clientList = null;
//        clientList.add(client);
//        return clientList;
//    }
//
//    Client testClient2() {
//        client = new Client();
//        address = new Address();
//        client.setClientId(1);
//        address.setStreetAddress("110 Bear Creek");
//        address.setCity("Asheville");
//        address.setState("NC");
//        address.setZipCode("12345");
//        client.setCompanyName("Up Country");
//        client.setWebsiteUri("www.upcountry.com");
//        client.setPhoneNumber("9288563213");
//        return client;
//    }
//
//    List<Person> testPerson() {
//        person = new Person();
//        address = new Address();
//        address.setStreetAddress("111 Bear Creek");
//        address.setCity("Asheville");
//        address.setState("NC");
//        address.setZipCode("12345");
//        person.setAddress(address);
//        person.setPersonId(1);
//        person.setFirstName("James");
//        person.setLastName("Smith");
//        person.setEmailAddress("test@email.com");
//        person.setClientId(1);
//
//        List<Person> personList = null;
//        personList.add(person);
//        return personList;
//    };
//
//    @Test
//    void validateClient() {
//
//        List<String> clients = clientService.validateClient(testClient2());
//
//        Assertions.assertEquals(clients, testClient().get(0));
//
//    }
//}