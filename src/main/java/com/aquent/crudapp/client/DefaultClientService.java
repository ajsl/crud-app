package com.aquent.crudapp.client;

import com.aquent.crudapp.person.Person;
import com.aquent.crudapp.person.PersonDao;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Component
public class DefaultClientService implements ClientService {

    private final ClientDao clientDao;
    private final Validator validator;
    private final PersonDao personDao;

    public DefaultClientService(ClientDao clientDao, PersonDao personDao, Validator validator) {
        this.clientDao = clientDao;
        this.personDao = personDao;
        this.validator = validator;
    }

    @Override
    public List<Client> listClients() {
        List<Client> clients = clientDao.listClients();

        for (Client client: clients) {
            List<Person> contacts = personDao.listContacts(client.getClientId());
            client.setContacts(contacts);
        }

        return clients;
    }

    @Override
    public Integer createClient(Client client) {
        return clientDao.createClient(client);
    }

    @Override
    public Client readClient(Integer clientId) {
        Client client = clientDao.readClient(clientId);
        List<Person> contacts = personDao.listContacts(client.getClientId());
        client.setContacts(contacts);
        return client;
    }

    @Override
    public void updateClient(Client client) {
        clientDao.updateClient(client);
    }

    @Override
    public void deleteClient(Integer clientId) {
        clientDao.deleteClient(clientId);
    }

    @Override
    public List<String> validateClient(Client client) {
        Set<ConstraintViolation<Client>> violations = validator.validate(client);
        List<String> errors = new ArrayList(violations.size());
        for (ConstraintViolation<Client> violation : violations) {
            errors.add(violation.getMessage());
        }
        Collections.sort(errors);
        return errors;
    }
}
