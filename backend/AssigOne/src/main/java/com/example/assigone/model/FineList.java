package com.example.assigone.model;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElementWrapper;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@XmlRootElement(name = "FineList")
@XmlAccessorType(XmlAccessType.FIELD)
@ToString
public class FineList {
    private String username;
    @XmlElementWrapper(name = "list")
    private List<Fine> myFines;
}
