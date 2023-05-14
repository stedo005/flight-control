package de.stedo.flightcontrol.entities

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import java.util.UUID

@Entity
class RcModel(
    @Id
    val id: String = UUID.randomUUID().toString(),
    val name: String,
    @Column(name = "pilot_id")
    val pilotId: String,
)
