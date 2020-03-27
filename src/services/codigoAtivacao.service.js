import enviarEmail from './enviarEmail.service';
import AtivacaoCodigoModel from '../models/codigoAtivacao.model';

export default class CodigoAtivacaoService {

    async enviarAtivacaoCodigo(email) {
        try {
            AtivacaoCodigoModel.findOneAndRemove({email}).exec();
            const codigoAtivacao = new AtivacaoCodigoModel({ email });
            const codigoAtivacaoSalvo = await codigoAtivacao.save();
            const codigoComoArray = codigoAtivacaoSalvo.codigo.split('');
            const codigo = codigoComoArray.join(' ');

            const emailOpcao = {
                email,
                subject: 'codigo de ativacao',
                content: 'Use o código a seguir para ativar sua conta',
                html: `<h3><strong>${codigo}</strong></h3>`
            };

            return enviarEmail(emailOpcao);

        } catch (err) {
            console.log(err);
            return false;
        }
    }

}
