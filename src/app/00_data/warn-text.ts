import { Info, Warning } from "./interfaces";

export const INFO: Info[] = [
    {
        group: "backEnd",
        members: ["backend"]
    },
    {
        group: "irgendeine Gruppe",
        members: ["Who", "You", "Gonna", "Call?"]
    },
    {
        group: "group",
        members: ["client", "backendAction", "backendPresenter", "backendManage"]
    },
    {
        group: "Gruppe B",
        members: ["datastoreReader", "media", "datastoreWriter", "autoupdate"]
    }
]

export const WARNING: Warning[] = [
    //Gruppen-Services//
    //----------------------------/
    {
        //services: jede einzelnes Service
        service: "all",
        warn: "Alles. Willst du wirklich alles neustarten?",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "backEnd",
        warn: "Das Backend. Willst du wirklich das gesamte backend neustarten?",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "irgendeine Gruppe",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "group",
        warn: "Das Backend. Willst du wirklich das gesamte backend neustarten?",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "Gruppe B",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },

    //Base services//
    //-------------------------------/
    {
        service: "client",
        warn: "das ist ein Test-Text für client",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "backendAction",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "backendPresenter",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "backendManage",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "autoupdate",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "vote",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "auth",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "datastoreReader",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "datastoreWriter",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "icc",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "media",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "manage",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "proxy",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },
    {
        service: "redis",
        warn: "das ist ein Test-Text",
        hint: "Das ist die Box für best mögliche Action"
    },
]