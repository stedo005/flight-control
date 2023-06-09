package de.stedo.flightcontrol.repository

import de.stedo.flightcontrol.entities.Pilot
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PilotRepository : JpaRepository<Pilot, String> {
    fun findByName(name: String): Pilot
}
