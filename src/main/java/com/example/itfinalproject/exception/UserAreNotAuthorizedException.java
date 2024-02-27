package com.example.itfinalproject.exception;

public class UserAreNotAuthorizedException extends RuntimeException {
    public UserAreNotAuthorizedException(String message) {
        super(message);
    }
}
