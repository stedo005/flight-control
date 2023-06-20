package de.stedo.flightcontrol.entities

class AuthData(
    val token: String,
    val username: String,
    val userId: String,
    val roles: List<String>,
)