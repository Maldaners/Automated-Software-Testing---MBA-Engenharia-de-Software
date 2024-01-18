import { Repositorio } from "../model/contract/Repositorio";
import { Conta } from "../model/Conta";
import { TransferenciaDTO } from "./dto/TransferenciaDTO";
import { TransferenciaValor } from "../model/service/TransferenciaValor";
import { Recibo } from "../model/Recibo";

export class TransferenciaServico {
    private _repositorio: Repositorio<string, Conta>;

    public constructor(repositorio: Repositorio<string, Conta>){
        this._repositorio = repositorio;
    }

    public transferir(dto: TransferenciaDTO): string {
        const contaOrigem = this._repositorio.buscar(dto.contaOrigem)!;
        const contaDestino = this._repositorio.buscar(dto.contaDestino)!;

        const transferencia: TransferenciaValor = new TransferenciaValor();
        const recibo: Recibo = transferencia.transferir(contaOrigem, contaDestino, dto.valor);

        this._repositorio.adicionar(contaOrigem);
        this._repositorio.adicionar(contaDestino);

        return recibo.codigo;
    }
}