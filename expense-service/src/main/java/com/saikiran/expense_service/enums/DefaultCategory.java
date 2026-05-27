package com.saikiran.expense_service.enums;

public enum DefaultCategory {

    FOOD("Food"),
    TRAVEL("Travel"),
    SHOPPING("Shopping"),
    HEALTH("Health"),
    ENTERTAINMENT("Entertainment"),
    OTHER("Other");

    private final String displayName;

    DefaultCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
