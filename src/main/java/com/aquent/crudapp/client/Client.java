package com.aquent.crudapp.client;

import com.aquent.crudapp.person.Person;

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

    private List<Person> contacts;

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getWebsiteUri() { return websiteUri; }

    public void setWebsiteUri(String websiteUri) {
        this.websiteUri = websiteUri;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
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

    public void setContacts(List<Person> people) { this.contacts = people; }

    public List<Person> getContacts(Integer contact) {
        return contacts;
    }
}
