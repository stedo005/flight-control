package de.stedo.flightcontrol

import jakarta.persistence.Entity
import jakarta.persistence.Id
import java.util.UUID

@Entity
class Userinnen(
        @Id
        val id: String = UUID.randomUUID().toString(),
        val bla: String
)

