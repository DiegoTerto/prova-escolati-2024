import { useState } from 'react'
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
import { Input } from './components/ui/input';

function App() {
  const [ viagens ] = useState<Viagem[]>([new Viagem(
    {
      nome: 'Viagem 1',
      dataSaida: '2024-08-09',
      dataChegada: '2024-08-09',
      valor: 3450.87
    }
  )])

  const [newViagem ] = useState<Viagem>(new Viagem());

  return (
    <>
      <div className='p-4'>
        <div>
          <h1>Viagens</h1>
        </div>
        <div className='mt-4'>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='bg-primary' variant='outline'>Nova Viagem</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nova viagem</DialogTitle>
                </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 items-center gap-2">
                      <Label htmlFor="nome">
                        Nome
                      </Label>
                      <Input
                        id="nome"
                        className="col-span-3"
                        value={newViagem.nome}
                      />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-2">
                      <Label htmlFor="dataSaida">
                        Data de saída
                      </Label>
                      <Input
                        id="nome"
                        className="col-span-3"
                        value={newViagem.dataSaida}
                        onChange={(e) => newViagem.dataSaida = e.target.value}
                      />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-2">
                      <Label htmlFor="nome">
                        Data chegada
                      </Label>
                      <Input
                        id="nome"
                        className="col-span-3"
                        value={newViagem.dataChegada}
                        onChange={(e) => newViagem.dataChegada = e.target.value}
                      />
                    </div>
                  </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Data de saída</TableHead>
                  <TableHead>Data de entrada</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='text-left'>
                {viagens.map((viagem) => (
                  <TableRow key={viagem.nome}>
                    <TableCell>{viagem.nome}</TableCell>
                    <TableCell>{viagem.dataSaida.toString()}</TableCell>
                    <TableCell>{viagem.dataChegada.toString()}</TableCell>
                    <TableCell>{viagem.valor}</TableCell>
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
