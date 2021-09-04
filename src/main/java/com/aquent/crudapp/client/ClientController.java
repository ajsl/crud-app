package com.aquent.crudapp.client;

import com.aquent.crudapp.person.PersonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("client")
public class ClientController {

    private final ClientService clientService;
    private final PersonService personService;

    public ClientController(ClientService clientService, PersonService personService) {
        this.clientService = clientService;
        this.personService = personService;
    }

    @RequestMapping(value = "list")
    public ResponseEntity<List<Client>> getClients() {
        try {
            return new ResponseEntity(clientService.listClients(), HttpStatus.OK);
        } catch(Exception e) {
            throw e;
        }

    }


    @PostMapping(value = "create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Client> createClient(@RequestBody Client client){
        try{
            Integer id = clientService.createClient(client);
            return new ResponseEntity(id, HttpStatus.CREATED);
        } catch(Exception e){
            throw e;
        }
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Client> getClient(@PathVariable Integer id) {
        try{
            Client client = clientService.readClient(id);
            return new ResponseEntity(client, HttpStatus.OK);
        } catch(Exception e){

            throw e;
        }

    }

    @PutMapping(value = "{id}")
    public ResponseEntity updateClient(@PathVariable String id, @RequestBody Client client){
        try{
            clientService.updateClient(client);

            return new ResponseEntity(HttpStatus.CREATED);

        } catch(Exception e){
            throw e;
        }
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity deleteClient(@PathVariable Integer id){
        try{
            clientService.deleteClient(id);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e){
            throw e;
        }
    }

}
