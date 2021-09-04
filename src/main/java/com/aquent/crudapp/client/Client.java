package com.aquent.crudapp.client;

import com.aquent.crudapp.person.Person;
import com.sun.xml.internal.ws.api.ha.StickyFeature;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.LinkedList;
import java.util.List;

public class Client {

    private Integer clientId;

    private String companyName;

    private String websiteUri;

    private String phoneNumber;

    private String streetAddress;

    private String city;

    private String state;

    private String zipCode;

    private List<Integer> contacts;

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setWebsiteUri(String websiteUri) {
        this.websiteUri = websiteUri;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getAddress() {
        return streetAddress;
    }

    public void setAddress(String address) {
        this.streetAddress = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public List<Integer> getContacts() {
        return contacts;
    }

    public void setContacts(Integer contact) {
        this.contacts.add(contact);
    }
}
