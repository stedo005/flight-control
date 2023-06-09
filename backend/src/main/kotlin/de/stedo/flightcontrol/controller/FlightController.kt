package de.stedo.flightcontrol.controller

import de.stedo.flightcontrol.entities.Flight
import de.stedo.flightcontrol.entities.IsOnFlightlist
import de.stedo.flightcontrol.service.FlightService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/flight")
class FlightController(
    private val flightService: FlightService,
) {
    @GetMapping
    fun getAllFlights(): ResponseEntity<List<Flight>> {
        return flightService.getAllFlights()
    }

    @GetMapping("/{id}")
    fun getFlightById(@PathVariable id: String): ResponseEntity<Flight>{
        return flightService.getFlightById(id)
    }

    @PostMapping("/add/{modelId}")
    fun addFlight(@PathVariable modelId: String): ResponseEntity<Flight> = flightService.addFlight(modelId)

    @GetMapping("/is-model-on-flightlist/{modelId}")
    fun isModelOnFlightList(@PathVariable modelId: String): ResponseEntity<IsOnFlightlist> {
        return ResponseEntity(IsOnFlightlist(flightService.isModelOnFlightList(modelId)),HttpStatus.OK)
    }

    @GetMapping("/is-pilot-on-flightlist/{pilotId}")
    fun isPilotOnFlightlist(@PathVariable pilotId: String) = flightService.isPilotOnFlightlist(pilotId)

    @DeleteMapping("/delete/{id}")
    fun deleteFlight(@PathVariable id: String) {
        flightService.deleteFlight(id)
    }

}