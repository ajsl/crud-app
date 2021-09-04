package com.aquent.crudapp.client;


import com.aquent.crudapp.person.Person;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientDao {

    List<Client> listClients();

    Integer createClient(Client client);

    Client readClient(Integer clientId);

    void updateClient(Client client);

    void deleteClient(Integer clientId);

    List<Person> getContacts(Integer clientId);

}
