import { Warning } from "./interfaces";

export const WARNING: Warning[] = [
    //Gruppen-Services//
    //----------------------------/
    {
        //services: jede einzelnes Service
        service: "all",
        warn: "Alles. Willst du wirklich alles neustarten?",
        hint: " Das ist die Box für best mögliche Action"
    },
    {
        service: "backend",
        warn: "Das Backend. Willst du wirklich das gesamte backend neustarten?",
        hint: " Das ist die Box für best mögliche Action"
    },
    {
        service: "irgendeine Gruppe",
        warn: "das ist ein Test-Text",
        hint: " Das ist die Box für best mögliche Action"
    },

    //Base services//
    //-------------------------------/
    {
        service: "client",
        warn: "das ist ein Test-Text für client",
        hint: " Das ist die Box für best mögliche Action"
    },
    {
        service: "backend-action",
        warn: "das ist ein Test-Text",
        hint: " Das ist die Box für best mögliche Action"
    },
    {
        service: "backend-presenter",
        warn: "das ist ein Test-Text",
        hint: " Das ist die Box für best mögliche Action"
    },
    {
        service: "autoupdate",
        warn: "das ist ein Test-Text",
        hint: " Das ist die Box für best mögliche Action"
    },
    {
        service: "vote",
        warn: "das ist ein Test-Text",
        hint: " Das ist die Box für best mögliche Action"
    },
    {
        service: "auth",
        warn: "das ist ein Test-Text",
        hint: " Das ist die Box für best mögliche Action"
    },
    {
        service: "datastore-reader",
        warn: "das ist ein Test-Text",
        hint: " Das ist die Box für best mögliche Action"
    },
    {
        service: "datastore-writer",
        warn: "das ist ein Test-Text",
        hint: " Das ist die Box für best mögliche Action"
    },
    {
        service: "icc",
        warn: "das ist ein Test-Text",
        hint: " Das ist die Box für best mögliche Action"
    },
    {
        service: "media",
        warn: "das ist ein Test-Text",
        hint: " Das ist die Box für best mögliche Action"
    },
]