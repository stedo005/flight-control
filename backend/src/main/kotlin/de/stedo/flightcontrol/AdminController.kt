package de.stedo.flightcontrol

import de.stedo.flightcontrol.entities.Pilot
import de.stedo.flightcontrol.entities.RcModel
import de.stedo.flightcontrol.repository.Pilots
import de.stedo.flightcontrol.repository.RcModels
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
@RequestMapping("/api/admin")
class AdminController(
    private val pilots: Pilots,
    private val rcModels: RcModels,
) {
    @GetMapping("/all-pilots")
    fun getAllPilots(): MutableList<Pilot> {
        return pilots.findAll()
    }

    @GetMapping("/create-pilot")
    fun createPilot(): String {
        pilots.save(
            Pilot(
                name = "Steve"
            )
        )
        return "user saved"
    }

    @GetMapping("/create-model/{id}")
    fun createRcModel(@PathVariable id: String) {
        rcModels.save(
            RcModel(
                name = "heli",
                pilotId = id
            )
        )
    }
}