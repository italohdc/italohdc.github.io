---
layout: post
title:  "Configurar uma Raspberry Pi Zero W sem monitor"
date:   2017-09-11 07:32:02 +0000
lang:   pt_BR
thumbnail: raspberrypi0w.jpg
---

A Raspberry Pi Zero W é um computador com menos de 3 polegadas e que custa aproximadamente $10. O seu tamanho reduzido, a presença de conexão Wi-Fi e Bluetooth, além do fato de conseguir rodar um sistema operacional Linux, o torna ideal para a criação de pequenos servidores, projetos que utilizam linguagens de alto nível (como Python e JavaScript) ou o controle/leitura de dispositivos eletrônicos (possui 36 portas GPIO).

{% include image.html file="RaspberryPi0W_concept.jpg" float=true description="Raspberry Pi Zero W ao centro" %}

O modo mais fácil de fazer a configuração inicial é utilizando um monitor, mouse e teclado. Porém, pode acontecer de você não ter um monitor extra disponível para conectar à sua Raspberry. Como apontado pelo site australiano [Core Eletronics](https://core-electronics.com.au/tutorials/raspberry-pi-zerow-headless-wifi-setup.html), é possível utilizar a Raspberry sem um monitor. Essa forma de utilizar o dispositivo é chamado **Headless Mode**.

O guia a seguir apresentará o passo a passo de como instalar e configurar o acesso remoto ao sistema Raspbian na sua Raspberry. Para controlar a Raspberry remotamente, será necessário que o seu computador e a Raspberry estejam conectados à mesma rede Wi-Fi.

> Uma outra opção de Sistema Operacional para utilizar na Raspberry é o [DietPi](http://dietpi.com/), que é baseado no Raspbian, porém é mais leve.

## Configurando o acesso remoto à Raspberry sem um monitor

Primeiramente, será necessário baixar uma imagem do [Raspbian](https://www.raspberrypi.org/downloads/raspbian/) (o Raspbian é um sistema operacional Linux baseado no Debian otimizado para o hardware da Raspberry Pi) e instalar num cartão **microSD**.

### Instalando o Raspbian no cartão microSD (Windows)

Para instalar o Raspbian no cartão microSD, será necessário o programa [Win32DiskImager](https://sourceforge.net/projects/win32diskimager/).

{% include image.html file="2017-09-08-configurar-rasp0-sem-monitor/win32-disk-imager.png" float=true description="Win32 Disk Imager" %}

1. Descompacte a imagem do Raspbian baixada. Se não conseguir descompactar o arquivo, tente usar o [7-Zip](http://www.7-zip.org/download.html).
2. Selecione no programa o o arquivo ``.img`` descompactado e a letra da unidade que está localizado o cartão de memória. Por exemplo, letra ``E:``.
3. Após conferir que a imagem e o dispositivo selecionados estão corretos, selecione no programa a opção ``Write``. (Essa etapa pode demorar um pouco, dependendo da velocidade de gravação do seu cartão microSD)

### Configurando a conexão Wi-Fi

Na nova partição ``boot`` criada no cartão de memória, crie um arquivo com o seguinte nome:

```
wpa_supplicant.conf
```

{% include image.html file="2017-09-08-configurar-rasp0-sem-monitor/boot-folder.png" description="Organização de pastas da unidade de boot" %}

Edite o arquivo criado e adicione os seguintes parâmetros:

```
network={
    ssid="SSID"
    psk="PASSWORD"
    key_mgmt=WPA-PSK
}
```

Lembrando de substituir ``SSID`` pelo nome da sua rede Wi-Fi e ``PASSWORD`` pela senha da sua rede Wi-Fi. O parâmetro ``key_mgmt`` refere-se ao protocolo de segurança utilizado pela rede.

### Ativando SSH

As novas versões do Raspbian vêm com _SSH_ desativado por padrão, por questões de segurança. O _SSH_ é um protocolo de rede que será utilizado para fazer a comunicação entre o seu computador e a Raspberry.

Ainda no diretório principal da unidade ``boot`` do cartão de memória, crie um arquivo vazio com o nome ``ssh``

### Conectando à Raspberry remotamente

Os arquivos no cartão de memória estão devidamente configurados. Desconecte o cartão microSD do computador e conecte à sua Raspberry Pi. Conecte a Raspberry a uma fonte de alimentação e espere um momento enquanto é realizado o boot do sistema.

No seu computador, será utilizado o cliente [Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) no Windows para conectar à Raspberry.

O Raspbian vem configurado por padrão com o seguinte hostname:

```
raspberrypi
```

Entre com esse _hostname_ no Putty para conectar à sua Raspberry Pi.

> Se você não conseguir conectar à sua Raspberry através do hostname, procure pelo IP associado a ela no roteador. [O site oficial da Raspberry Pi apresenta outras formas de se descobrir o endereço IP do sistema](https://www.raspberrypi.org/documentation/remote-access/ip-address.md).

{% include image.html file="2017-09-08-configurar-rasp0-sem-monitor/putty-001.png" description="Putty" %}

Se tudo ocorrer corretamente, aparecerá uma janela pedindo as informações de login e senha para acessar o sistema operacional da Raspberry. O usuário padrão é ``pi`` e a senha é ``raspberry``.

---

Fontes: [Trendblog](http://trendblog.net/install-raspbian-sd-card-os-x-windows/), [Core Electronics](https://core-electronics.com.au/tutorials/raspberry-pi-zerow-headless-wifi-setup.html), [Raspberry Pi Foundation](https://www.raspberrypi.org/documentation/remote-access/ssh/windows.md)
