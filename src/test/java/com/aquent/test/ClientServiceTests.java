//package com.aquent.test;
//
//import com.aquent.crudapp.client.Client;
//import com.aquent.crudapp.client.ClientService;
//import com.aquent.crudapp.client.DefaultClientService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.Before;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.client.MockRestServiceServer;
//
//@RestClientTest(DefaultClientService.class)
//public class ClientServiceTests {
//
//    private DefaultClientService clientService;
//    @Autowired
//    private MockRestServiceServer server;
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Before
//    public void setUp() throws Exception {
//        String client = objectMapper.writeValueAsString(new Client());
//
////        this.MockRestServiceServer.MockRestServiceServerBuilder
////        expect(requestTo("john/details")).andRespond(WithSuccess(details, MediaType.APPLICATION_JSON))
//    }
//
//}
