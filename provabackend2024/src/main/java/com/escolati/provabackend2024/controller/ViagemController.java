package com.escolati.provabackend2024.controller;

import com.escolati.provabackend2024.dto.PersistViagemRequestDTO;
import com.escolati.provabackend2024.dto.ViagemDTO;
import com.escolati.provabackend2024.model.Destino;
import com.escolati.provabackend2024.model.Viagem;
import com.escolati.provabackend2024.model.ViagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static java.util.Objects.isNull;

@RestController
@RequestMapping("/api/viagens")
public class ViagemController {

    @Autowired
    private ViagemRepository viagemRepository;

    @PostMapping
    public ResponseEntity<ViagemDTO> create(@RequestBody PersistViagemRequestDTO dto) {
        Viagem viagem = new Viagem(dto);
        viagem.addDestino(Destino.builder().nome(dto.destino()).build());
        return ResponseEntity.status(HttpStatus.CREATED).body(new ViagemDTO(viagemRepository.save(viagem)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ViagemDTO> update(@PathVariable Long id, @RequestBody PersistViagemRequestDTO dto) {
        Viagem viagem = viagemRepository.findById(id).orElseThrow();
        viagem.update(dto);
        if(isNull(dto.destino())) {
            viagem.removeDestino();
        } else {
            viagem.addDestino(Destino.builder().nome(dto.destino()).build());
        }
        return ResponseEntity.ok(new ViagemDTO(viagemRepository.save(viagem)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ViagemDTO> findById(@PathVariable Long id) {
        Viagem viagem = viagemRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(new ViagemDTO(viagem));
    }

    @GetMapping
    public ResponseEntity<List<ViagemDTO>> findAll() {
        List<Viagem> viagens = viagemRepository.findAll();
        return ResponseEntity.ok(viagens.stream().map(ViagemDTO::new).toList());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Viagem viagem = viagemRepository.findById(id).orElseThrow();
        viagemRepository.delete(viagem);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
