package com.example.assigone.exporter.adapters;

import jakarta.xml.bind.annotation.adapters.XmlAdapter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

public class DateAdapter extends XmlAdapter<String, Date> {

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Override
    public Date unmarshal(String dateString) throws ParseException {
        return dateFormat.parse(dateString);
    }

    @Override
    public String marshal(Date date) {
        return dateFormat.format(date);
    }
}