package de.stedo.flightcontrol.entities

import jakarta.persistence.*
import java.util.UUID

@Entity
class Pilot(
        @Id
        val id: String = UUID.randomUUID().toString(),
        val username: String,
        val surname: String,
        val lastname: String,
        var password: String,
        val roles: List<String> = listOf("USER"),
        @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
        @JoinColumn(name = "pilot_id", referencedColumnName = "id")
        val rcModels: Set<RcModel> = emptySet(),
)

