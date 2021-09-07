package com.aquent.crudapp.client;

import com.aquent.crudapp.person.Person;
import com.aquent.crudapp.shared.Address;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * The client entity corresponding to the "client" table in the database.
 */
public class Client {

    Integer clientId;

    @NotNull
    @Size(min = 1, max = 50, message = "Company name is required with maximum length of 50")
    private String companyName;

    @NotNull
    @Size(min = 1, max = 50, message = "Website Url is required with maximum length of 50")
    private String websiteUri;

    @NotNull
    @Size(min = 10, max = 15, message = "Phone number is required with maximum length of 15 and minimum length of 10 ")
    private String phoneNumber;

    private Address address;

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

    public void setAddress(Address address) {
        this.address = address;
    }

    public Address getAddress() {
        return address;
    }

    public void setContacts(List<Person> people) { this.contacts = people; }

    public List<Person> getContacts(Integer contact) {
        return contacts;
    }
}
