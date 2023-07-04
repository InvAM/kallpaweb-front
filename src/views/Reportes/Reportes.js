import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartKey: "",
      searchDate: "",
      contratos: [],
      end: null,
      start: null,
      conteoContratos: {},
      fechas: [],
      cantidad: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1, // Ajusta el valor según tus necesidades
      },
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Contratos",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
    };
  },
  mounted() {
    this.obtenerContratos();
    this.contarContratos();
  },
  watch: {
    start(newValue) {
      this.$forceUpdate();
    },
    end(newValue) {
      this.$forceUpdate();
    },
  },
  computed: {
    headers() {
      return [
        { text: "ID Contrato", value: "IDContrato" },
        { text: "Fecha", value: "Fecha_Con" },
        { text: "Número Radicado", value: "NumeroRadicado_Con" },
        { text: "Número Suministro", value: "numSum" },
        { text: "Punto de Instalación", value: "PuntoInstalacion_Con" },
        { text: "Estado", value: "estado" },
        { text: "Categoría Gabinete", value: "IDGabineteCategoria" },
        { text: "Tipo Instalación", value: "IDTipoInst" },
        { text: "DNI Cliente", value: "DNI_cli" },
        { text: "DNI Empleado", value: "DNI_Em" },
      ];
    },
    contratosFiltrados() {
      return this.contratos.filter((contrato) => {
        if (!this.start || !this.end) {
          return true;
        }
        const start = new Date(this.start);
        const end = new Date(this.end);
        const contratoFecha = new Date(contrato.Fecha_Con);
        this.cantidad = contratoFecha;
        this.fetchChartData();
        return contratoFecha >= start && contratoFecha <= end && this.cantidad;
      });
    },
  },
  methods: {
    contarContratos() {
      // Obtener los contratos dentro del rango de fechas
      const contratosFiltrados = this.contratos.filter((contrato) => {
        const fechaContrato = new Date(contrato.Fecha_Con);
        return fechaContrato >= this.start && fechaContrato <= this.end;
      });

      // Obtener la cantidad de contratos por fecha
      const conteoContratos = {};
      contratosFiltrados.forEach((contrato) => {
        const fechaContrato = new Date(contrato.Fecha_Con).toDateString();
        if (conteoContratos[fechaContrato]) {
          conteoContratos[fechaContrato]++;
        } else {
          conteoContratos[fechaContrato] = 1;
        }
      });

      // Convertir los datos en un formato adecuado para VSparkline
      this.fechas = Object.keys(conteoContratos);
      this.cantidad = this.fechas.map((fecha) => conteoContratos[fecha]);
    },

    generarReporte() {
      this.conteoContratos = this.obtenerEstadosContratos();
    },
    obtenerEstadosContratos() {
      const conteoEstados = {};
      const contratosFiltrados = this.contratosFiltrados;

      contratosFiltrados.forEach((contrato) => {
        const estado = contrato.estado;
        if (conteoEstados[estado]) {
          conteoEstados[estado]++;
        } else {
          conteoEstados[estado] = 1;
        }
      });

      return conteoEstados;
    },
    obtenerContratos() {
      this.axios
        .get("http://localhost:3000/contrato")
        .then((response) => {
          this.contratos = response.data;
        })
        .catch((error) =>
          console.error("Error al obtener los datos de los contratos : ", error)
        );
    },

    reporteContrato() {
      this.$router.push("/reportes/contratos");
    },
    reporteCliente() {
      this.$router.push("/reportes/clientes");
    },
    reporteOrdenes() {
      this.$router.push("/reportes/ordenes");
    },
    menu() {
      this.$router.push("/menu");
    },
    fetchChartData() {
      const startDate = new Date(this.start);
      const endDate = new Date(this.end);
      const labels = [];
      const currentDate = new Date(startDate);
      const datasetData = [];

      while (currentDate <= endDate) {
        labels.push(currentDate.toLocaleDateString());

        // Filtrar los contratos que corresponden a la fecha actual
        const contractsOnDate = this.contratos.filter((contrato) => {
          const contratoFecha = new Date(contrato.Fecha_Con);
          return contratoFecha.toDateString() === currentDate.toDateString();
        });

        datasetData.push(contractsOnDate.length);

        currentDate.setDate(currentDate.getDate() + 1);
      }

      this.chartData.labels = labels;
      this.chartData.datasets[0].data = datasetData;

      this.chartKey = Math.random().toString();
    },
  },
};
