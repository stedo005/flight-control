package de.stedo.flightcontrol.controller

import de.stedo.flightcontrol.entities.RcModel
import de.stedo.flightcontrol.service.RcModelService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/model")
class RcModelController(
    private val rcModelService: RcModelService
) {
    @GetMapping("/{modelId}")
    fun getModelById(@PathVariable modelId: String) = rcModelService.getModelById(modelId)

    @PostMapping("/create")
    fun createModel(@RequestBody rcModel: RcModel) = rcModelService.createRcModel(rcModel)

    @DeleteMapping("/delete/{modelId}")
    fun deleteModel(@PathVariable modelId: String) = rcModelService.deleteModel(modelId)

}