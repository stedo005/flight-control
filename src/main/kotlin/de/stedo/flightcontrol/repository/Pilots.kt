package de.stedo.flightcontrol.repository

import de.stedo.flightcontrol.Userinnen
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface Pilots : JpaRepository<Userinnen, String> {
}
