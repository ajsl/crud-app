package com.aquent.crudapp.person;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for handling basic person management operations.
 */
@RestController
@RequestMapping("person")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    /**
     * Returns List of People.
     *
     * @return list of all people
     */
    @GetMapping(value = "list")
    public ResponseEntity<List<Person>> list() {
       try{
           return new ResponseEntity<>(personService.listPeople(), HttpStatus.OK);
       } catch(Exception e){
           throw e;
       }
    }

    /**
     * Creates a new Person record
     *
     * @return Id of the new person
     */
    @PostMapping(value = "create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Person> createPerson(@RequestBody Person person){
        try{
            List<String> errors = personService.validatePerson(person);
            if (errors.isEmpty()) {
                Integer id = personService.createPerson(person);
                return new ResponseEntity(id, HttpStatus.CREATED);
            } else {
                return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
            }

        } catch(Exception e){
            throw e;
        }
    }

    /**
     * Gets a single person record
     *
     * @return Person object
     */
    @GetMapping(value = "{id}")
    public ResponseEntity<Person> getPerson(@PathVariable Integer id) {
       try{
           Person person = personService.readPerson(id);
           return new ResponseEntity<>(person, HttpStatus.CREATED);
       } catch(Exception e){
           throw e;
       }
    }

    /**
     * Updates a single person record
     *
     * @return HttpStatus NoContent
     */
    @PutMapping(value = "{id")
    public ResponseEntity updatePerson(@PathVariable String id, @RequestBody Person person){
        try{
            List<String> errors = personService.validatePerson(person);
            if(errors.isEmpty()){
                personService.updatePerson(person);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
            }

        } catch(Exception e){
            throw e;
        }
    }

    /**
     * Deletes a single person record
     *
     * @return HttpStatus NoContent
     */
    @DeleteMapping(value = "{id}")
    public ResponseEntity deletePerson(@PathVariable Integer id){
        try{
            personService.deletePerson(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(Exception e){
            throw e;
        }
    }

}
