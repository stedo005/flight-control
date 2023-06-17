package de.stedo.flightcontrol.repository

import de.stedo.flightcontrol.entities.Flight
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface FlightRepository : JpaRepository<Flight, String> {
}