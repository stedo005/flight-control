package de.stedo.flightcontrol.entities

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.MapsId
import jakarta.persistence.OneToOne
import java.sql.Timestamp
import java.util.UUID

@Entity
class Flight(
    @Id
    val id: String = UUID.randomUUID().toString(),
    @OneToOne
    @MapsId
    val rcModel: RcModel,
    val createdAt: Timestamp,
)