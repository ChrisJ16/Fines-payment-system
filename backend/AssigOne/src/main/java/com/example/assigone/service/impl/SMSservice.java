package com.example.assigone.service.impl;

import com.twilio.Twilio;
import com.twilio.converter.Promoter;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import java.net.URI;
import java.math.BigDecimal;

public class SMSservice{
    // Find your Account Sid and Token at twilio.com/console
    public static final String ACCOUNT_SID = "AC903f7d4f3ac775e8e5b34fa4438dc3c3";
    public static final String AUTH_TOKEN = "ec18e022d2affc6c24005d5253e3358d";

    public void sendSMS(String txt) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(
                new com.twilio.type.PhoneNumber("+40786150483"),
                new com.twilio.type.PhoneNumber("+13158738396"),
                "Logged in, user: " + txt)

                        .create();

        System.out.println(message.getSid());
    }
}