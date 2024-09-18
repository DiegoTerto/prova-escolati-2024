/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import './App.css'
import { Viagem } from './domain/Viagem';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { Label } from '@radix-ui/react-label';
import { Trash2, Pencil } from 'lucide-react';
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

function App() {
  const headers = {
    "Content-Type": "application/json",
  }

  const [ editViagemId, setEditViagemId ] = useState<number | null >(null);

  const [ viagens, setViagens ] = useState<Viagem[]>([]);
  const [ newViagemName, setNewViagemName ] = useState<string>('');
  const [ newViagemDataSaida, setNewViagemDataSaida ] = useState<string>('');
  const [ newViagemDataChagada, setNewViagemDataChagada ] = useState<string>('');
  const [ newViagemValor, setNewViagemValor ] = useState<number>(0);
  const [ newViagemDestino, setNewViagemDestino ] = useState<string>('');
  const [ openNewModal, setOpenNewModal ] = useState<boolean>(false)

  const handleCreateUpdateViagem = (event: any) => {
    console.log(editViagemId)
    if (editViagemId !== null) {
      update()
      event.preventDefault();
      return;
    }
    addViagem();
    event.preventDefault();
  }

  const addViagem = async () => {
    await fetch('/api/viagens', {
      method: "POST",
      body: JSON.stringify({
        nome: newViagemName,
        dataSaida: newViagemDataSaida,
        dataChegada: newViagemDataChagada,
        valor: newViagemValor,
        destino: newViagemDestino,
      }),
      headers
    })
    setOpenNewModal(false)
    clearNewViagemData();
    getData()
  }

  const update = async () => {
    await fetch(`/api/viagens/${editViagemId}`, {
      method: "PUT",
      body: JSON.stringify({
        nome: newViagemName,
        dataSaida: newViagemDataSaida,
        dataChegada: newViagemDataChagada,
        valor: newViagemValor,
        destino: newViagemDestino,
      }),
      headers
    })
    setOpenNewModal(false)
    clearNewViagemData();
    setEditViagemId(null);
    getData()
  }

  const clearNewViagemData = () => {
    setNewViagemName('');
    setNewViagemDataSaida('');
    setNewViagemDataChagada('');
    setNewViagemValor(0);
    setNewViagemDestino('');
  }

  const handleDelete = async (id: number) => {
    await fetch(`/api/viagens/${id}`, {
      method: "DELETE",
    });
    const currentViagens = viagens.filter(viagen => viagen.id !== id);
    setViagens(currentViagens);
  }

  const handleEdit = (id: number) => {
    setEditViagemId(id);
    const editViagemFound = viagens.find(viagem => viagem.id === id);
    if (!editViagemFound) return;
    setNewViagemName(editViagemFound.nome);
    setNewViagemDataSaida(editViagemFound.dataSaida);
    setNewViagemDataChagada(editViagemFound.dataChegada);
    setNewViagemValor(editViagemFound.valor);
    setNewViagemDestino(editViagemFound.destino);
    setOpenNewModal(true);
  }

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const response = await fetch("/api/viagens");
    const responseJson = await response.json();
    setViagens(responseJson);
  }

  return (
    <>
      <div className='p-4'>
        <div>
          <h1>Viagens</h1>
        </div>
        <div className='mt-4'>
          <div>
            <Dialog open={openNewModal} onOpenChange={setOpenNewModal}>
              <DialogTrigger asChild>
                <Button className='bg-primary' variant='outline'>Nova Viagem</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nova viagem</DialogTitle>
                </DialogHeader>
                  <form onSubmit={handleCreateUpdateViagem}>
                    <div className='flex flex-col'>
                      <Label htmlFor="nome">
                        Nome
                      </Label>
                      <input
                        id="nome"
                        type="text"
                        value={newViagemName}
                        onChange={(e) => setNewViagemName(e.target.value)}
                        className='bg-white border-2 p-2 rounded-md'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <Label htmlFor="dataSaida">
                        Data de saída
                      </Label>
                      <input
                        id='dataSaida'
                        type="date"
                        value={newViagemDataSaida}
                        onChange={(e) => setNewViagemDataSaida(e.target.value)}
                        className='bg-gray-200 border-2 p-2 rounded-md '
                      />
                    </div>
                    <div className='flex flex-col'>
                      <Label htmlFor="dataChagada">
                        Data de saída
                      </Label>
                      <input
                        id='dataChagada'
                        type="date"
                        value={newViagemDataChagada}
                        onChange={(e) => setNewViagemDataChagada(e.target.value)}
                        className='bg-white border-2 p-2 rounded-md'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <Label htmlFor="valor">
                        Valor
                      </Label>
                      <input
                        id='valor'
                        type="number"
                        value={newViagemValor}
                        onChange={(e) => setNewViagemValor(Number(e.target.value))}
                        className='bg-white border-2 p-2 rounded-md'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <Label htmlFor="destino">
                        Destino
                      </Label>
                      <input
                        id='destino'
                        type="text"
                        value={newViagemDestino}
                        onChange={(e) => setNewViagemDestino(e.target.value)}
                        className='bg-white border-2 p-2 rounded-md'
                      />
                    </div>
                    <DialogFooter className='mt-4'>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Data de saída</TableHead>
                  <TableHead>Data de entrada</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead className='text-center'>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='text-left'>
                {viagens?.map((viagem) => (
                  <TableRow key={viagem.id}>
                    <TableCell>{viagem.nome}</TableCell>
                    <TableCell>{viagem.dataSaida ? format(viagem.dataSaida, 'PPP', {locale: ptBR}) : ''}</TableCell>
                    <TableCell>{viagem.dataChegada ? format(viagem.dataChegada, 'PPP', {locale: ptBR}) : ''}</TableCell>
                    <TableCell>{viagem.destino}</TableCell>
                    <TableCell>R$ {viagem.valor}</TableCell>
                    <TableCell>
                      <div className='flex justify-center gap-2'>
                        <Button onClick={() => handleEdit(viagem.id)} variant="outline">
                          <Pencil className='h-4 w-4'/>
                        </Button>
                        <Button onClick={() => handleDelete(viagem.id)} variant="outline">
                          <Trash2 className='h-4 w-4'/>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
