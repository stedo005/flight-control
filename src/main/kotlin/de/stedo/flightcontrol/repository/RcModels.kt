package de.stedo.flightcontrol.repository

import de.stedo.flightcontrol.entities.RcModel
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RcModels : JpaRepository<RcModel, String>{
}