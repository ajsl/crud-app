//package com.aquent.crudapp.client;
//
//import com.aquent.crudapp.person.JdbcPersonDao;
//import com.aquent.crudapp.person.Person;
//import com.aquent.crudapp.person.PersonDao;
//import org.hibernate.validator.internal.engine.ValidatorImpl;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.junit.platform.runner.JUnitPlatform;
//import org.junit.runner.RunWith;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
//
//import javax.validation.Validator;
//import java.util.List;
//
//@ExtendWith(MockitoExtension.class)
//public class DefaultClientServiceTest {
//
//    private DefaultClientService clientService;
//
//    @Mock
//    private NamedParameterJdbcTemplate template;
//    private Validator validator;
//    private PersonDao personDao;
//    private ClientDao clientDao;
//
//    private Client client;
//    private Person person;
//
//    List<Client> testClient() {
//        client = new Client();
//        client.setClientId(1);
//        client.setCompanyName("Up Country");
//        client.setWebsiteUri("www.upcountry.com");
//        client.setPhoneNumber("9288563213");
//        client.setStreetAddress("110 Bear Creek");
//        client.setCity("Asheville");
//        client.setState("NC");
//        client.setZipCode("12345");
//
//        List<Client> clientList = null;
//        clientList.add(client);
//        return clientList;
//    }
//
//    List<Person> testPerson() {
//        person = new Person();
//        person.setPersonId(1);
//        person.setFirstName("James");
//        person.setLastName("Smith");
//        person.setEmailAddress("test@email.com");
//        person.setStreetAddress("111 Bear Creek");
//        person.setCity("Asheville");
//        person.setState("NC");
//        person.setZipCode("12345");
//        person.setClientId(1);
//
//        List<Person> personList = null;
//        personList.add(person);
//        return personList;
//    };
//
//    @BeforeEach
//    void setUp( ) {
//
//        clientService = new DefaultClientService(clientDao, personDao, validator);
//
//        Mockito.lenient().when(clientDao.listClients()).thenReturn(testClient());
//        Mockito.lenient().when(personDao.listContacts(client.getClientId())).thenReturn(testPerson());
//        Mockito.lenient().when(clientService.listClients()).thenReturn(testClient());
//
//    }
//
//    @AfterEach
//    void tearDown() {
//    }
//
//    @Test
//    void listClients() {
//        clientService = new DefaultClientService(clientDao, personDao, validator);
//
//        List<Client> clients = clientService.listClients();
//
//        Assertions.assertEquals(clients, testClient());
//    }
//
//    @Test
//    void createClient() {
//    }
//
//    @Test
//    void readClient() {
//    }
//
//    @Test
//    void updateClient() {
//    }
//
//    @Test
//    void deleteClient() {
//    }
//
//    @Test
//    void validateClient() {
//    }
//}