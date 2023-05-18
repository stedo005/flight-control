package de.stedo.flightcontrol.repository

import de.stedo.flightcontrol.entities.Pilot
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface Pilots : JpaRepository<Pilot, String> {
}
