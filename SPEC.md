# Especificação - Dashboard de Demandas SEINFRA/UFG

## Estrutura de Slides

O slideshow foi modificado para conter 4 slides:

| Slide | Conteúdo |
|-------|----------|
| 1 | KPIs principais + Tabelas de demandas por Campus e Unidade |
| 2 | Gráfico "Evolução: Processos Recebidos por Ano" (layout dedicado, 95% largura) |
| 3 | 4 gráficos: Prioridade, Regional, Classificações e Campus |
| 4 | Gráfico "Distribuição por Tipo de Demandas" |

## Alterações Realizadas

### index.html
- Slide 2: Removido gráfico "Distribuição por Tipo de Demandas"
- Novo slide 4: Adicionado com gráfico "Distribuição por Tipo de Demandas"
- Footer: Adicionado 4º ponto de navegação

### styles/main.css
- Nova classe `.layout-charts-1`: Layout para slides com gráfico único
- Dimensões: 95% largura (máx 1200px), 85vh altura

### js/app.js
- Função `nextSlide()`: Atualizado para 4 slides (era 3)
