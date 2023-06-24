package de.stedo.flightcontrol.service

import de.stedo.flightcontrol.entities.RcModel
import de.stedo.flightcontrol.repository.RcModelRepository
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.lang.IllegalArgumentException

@Service
class RcModelService(
    private val rcModelRepository: RcModelRepository
) {
    fun getModelById(modelId: String): RcModel {
        return rcModelRepository.findById(modelId)
            .orElseThrow { IllegalArgumentException("No Model found for Id: $modelId") }
    }

    fun createRcModel(rcModel: RcModel) {
        rcModelRepository.save(rcModel)
    }

    fun deleteModel(modelId: String) {
        rcModelRepository.deleteById(modelId)
    }

    fun updateRcModel(rcModel: RcModel): ResponseEntity<RcModel> =
        ResponseEntity<RcModel>(rcModelRepository.save(rcModel), HttpStatus.OK)
}