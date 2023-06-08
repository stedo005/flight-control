package de.stedo.flightcontrol

import de.stedo.flightcontrol.entities.Pilot
import de.stedo.flightcontrol.entities.RcModel
import de.stedo.flightcontrol.repository.PilotRepository
import de.stedo.flightcontrol.repository.RcModelRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/admin")
class AdminController(
    private val pilotRepository: PilotRepository,
    private val rcModelRepository: RcModelRepository,
) {
    @GetMapping("/all-pilots")
    fun getAllPilots(): MutableList<Pilot> {
        return pilotRepository.findAll()
    }

    @GetMapping("/create-pilot")
    fun createPilot(): String {
        pilotRepository.save(
            Pilot(
                name = "Steve",
                password = "123",
                role = "USER",
            )
        )
        return "user saved"
    }

    @GetMapping("/create-model/{id}")
    fun createRcModel(@PathVariable id: String) {
        rcModelRepository.save(
            RcModel(
                name = "heli",
                pilotId = id
            )
        )
    }
}