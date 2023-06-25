package de.stedo.flightcontrol.entities

import jakarta.persistence.*
import java.util.UUID

@Entity
class Pilot(
    @Id
    val id: String = UUID.randomUUID().toString(),
    val username: String,
    val firstname: String,
    val lastname: String,
    var password: String,
    val roles: List<String> = listOf("USER"),
    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JoinColumn(name = "pilot_id", referencedColumnName = "id")
    val rcModels: Set<RcModel> = emptySet(),
) {
    fun toDto(pilot: Pilot): CreatePilotDto {
        return CreatePilotDto(
            username = pilot.username,
            registerKey = null,
            firstname = pilot.firstname,
            lastname = pilot.lastname,
            password = null,
        )
    }
}

class CreatePilotDto(
    val username: String,
    val registerKey: String?,
    val firstname: String,
    val lastname: String,
    val password: String?,
) {
    fun toPilot(createPilotDto: CreatePilotDto): Pilot{
        return Pilot(
            username = createPilotDto.username,
            firstname = createPilotDto.firstname,
            lastname = createPilotDto.lastname,
            password = createPilotDto.password!!,
        )
    }
}

class PilotUpdateDto(
    val id: String,
    val firstname: String,
    val lastname: String,
)

