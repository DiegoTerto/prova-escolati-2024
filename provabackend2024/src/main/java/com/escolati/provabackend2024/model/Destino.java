package com.escolati.provabackend2024.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "DESTINO")
@Entity
@NoArgsConstructor
@Getter
@AllArgsConstructor
@Builder
public class Destino {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "NOME")
    private String nome;
}
