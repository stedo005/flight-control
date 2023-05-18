
plugins {
    base
    id("io.spring.dependency-management") version "1.1.0" apply false
    kotlin("jvm") version "1.7.22" apply false
}

allprojects {
    group = "de.stedo"
    version = "0.0.1-SNAPSHOT"

    repositories {
        mavenCentral()
    }
}

