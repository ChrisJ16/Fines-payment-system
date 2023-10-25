package com.example.assigone.model;

import com.example.assigone.exporter.adapters.DateAdapter;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.xml.bind.annotation.*;
import jakarta.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import lombok.*;

import java.util.Date;
import java.util.List;


@XmlRootElement(name = "fine")
@XmlAccessorType(XmlAccessType.FIELD)
@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="fine_tb")
public class Fine {
    @XmlAttribute
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private int sum;
    private String note;
    private boolean isPaid;

    @XmlJavaTypeAdapter(DateAdapter.class)
    @Temporal(TemporalType.DATE)
    private Date date;
    @ManyToOne(optional = false)
    @JsonBackReference(value = "user-fine")
    @XmlTransient
    private User user;
}
