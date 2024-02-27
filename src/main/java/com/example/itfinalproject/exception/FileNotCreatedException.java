package com.example.itfinalproject.exception;

import java.io.IOException;

public class FileNotCreatedException extends RuntimeException {
    public FileNotCreatedException(String message) {
        super(message);
    }
}
