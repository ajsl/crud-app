package com.aquent.crudapp.client;

import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for handling basic client management operations.
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("client")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    /**
     * Returns List of Clients.
     *
     * @return list of all clients
     */
    @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Client>> getClients() {
        Gson gson = new Gson();
        try {
            String data = gson.toJson(clientService.listClients());
            return new ResponseEntity(data, HttpStatus.OK);
        } catch(Exception e) {

            return new ResponseEntity(e.getMessage(), HttpStatus.valueOf(500));
        }
    }

    /**
     * Creates a new Client record
     *
     * @return Id of the new client
     */
    @PostMapping(value = "create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createClient(@RequestBody Client client){
        try{
            List<String> errors = clientService.validateClient(client);
            if (errors.isEmpty()){
                Integer id = clientService.createClient(client);
                return new ResponseEntity(id, HttpStatus.CREATED);
            } else {
                return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
            }
        } catch(Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.valueOf(500));
        }
    }

    /**
     * Gets a single client record
     *
     * @return Client object
     */
    @GetMapping(value = "{id}")
    public ResponseEntity<Client> getClient(@PathVariable Integer id) {
        Gson gson = new Gson();
        try{
            String client = gson.toJson(clientService.readClient(id));
            return new ResponseEntity(client, HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.valueOf(500));
        }
    }

    /**
     * Updates a single client record
     *
     * @return HttpStatus NoContent
     */
    @PutMapping()
    public ResponseEntity updateClient(@RequestBody Client client){
        try{
            List<String> errors = clientService.validateClient(client);
            if (errors.isEmpty()){
                clientService.updateClient(client);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
            }
        } catch(Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.valueOf(500));
        }
    }

    /**
     * Deletes a single client record
     *
     * @return HttpStatus NoContent
     */
    @DeleteMapping(value = "{id}")
    public ResponseEntity deleteClient(@PathVariable Integer id){
        try{
            clientService.deleteClient(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.valueOf(500));
        }
    }

}
