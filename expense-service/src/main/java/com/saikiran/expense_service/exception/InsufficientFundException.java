package com.saikiran.expense_service.exception;

public class InsufficientFundException extends RuntimeException{
    public InsufficientFundException(String message){
        super(message);
    }
}
