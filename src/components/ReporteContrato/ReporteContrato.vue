<template>
	<div class="report-c">
		<v-app-bar color="white" dense dark height="90">
			<v-toolbar-title>
				<v-img
					src="../../views/Img/Kallpa.png"
					max-height="300"
					max-width="200"
					class="kallpa-image">
				</v-img>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-img
				src="../../views/Img/usuario (3).png"
				max-height="100"
				max-width="50">
			</v-img>
		</v-app-bar>

		<v-footer color="#33cc33" app height="60">
			<v-row align="center" justify="center">
				<v-col cols="12" class="text-center white--text">
					&copy; 2023 KALLPA. Todos los derechos reservados.
				</v-col>
			</v-row>
		</v-footer>

		<div style="margin-top: 28px">
			<h1 class="text-center" style="font-family: 'Trebuchet MS'">
				<span style="color: #32cc32">REPORTE</span>
				<span style="color: #203864"> - CONTRATO</span>
			</h1>
		</div>
		<div class="d-flex">
			<div>
				<div style="margin-left: 14px">
					<div class="filtros contenedor-cajas-E">
						<v-card-title style="color: rgb(11, 13, 105); font-size: 30px"
							>Filtros</v-card-title
						>

						<v-card-text>
							<div class="contenedor-cajas-A">
								<p style="color: rgb(40, 180, 40); font-size: 18px">
									Estado Contrato
								</p>
								<v-radio-group v-model="estadoSeleccionado">
									<v-radio
										v-for="estado in estadosContratos"
										:key="estado"
										:label="estado"
										:value="estado">
									</v-radio>
								</v-radio-group>
							</div>

							<div class="contenedor-cajas-A">
								<p style="color: rgb(40, 180, 40); font-size: 18px">Asesor</p>
								<v-combobox
									v-model="empleadoSeleccionado"
									:items="empleadosCategoria1"
									item-text="nombreCompleto"
									item-value="DNI_Em"
									label="Seleccionar Asesor"
									clearable
									solo>
								</v-combobox>
							</div>
						</v-card-text>

						<v-card-actions>
							<v-btn
								@click="generarReporte"
								style="
									font-family: 'Trebuchet MS';
									width: 170px;
									background-color: rgb(11, 13, 105);
									color: #ffffff;
								"
								>Generar Reporte</v-btn
							>
							<v-btn
								@click="reporte"
								style="
									font-family: 'Trebuchet MS';
									width: 170px;
									background-color: rgb(11, 13, 105);
									color: #ffffff;
								"
								>Atras</v-btn
							>
						</v-card-actions>
					</div>
				</div>
			</div>
			<div class="contenedor-cajas-F">
				<v-card-title style="color: rgb(11, 13, 105); font-size: 30px"
					>Fecha</v-card-title
				>
				<v-row>
					<v-col cols="12" sm="6">
						<v-date-picker v-model="start" color="#32CC32"></v-date-picker>
					</v-col>
					<v-col cols="12" sm="6">
						<v-date-picker v-model="end" color="#32CC32"></v-date-picker>
					</v-col>
				</v-row>
			</div>

			<div class="reportec">
				<v-container style="margin-right: -10px" class="contenedor-cajas-B">
					<v-card outlined class="reporte">
						<v-card-title style="color: #32cc32; font-size: 30px"
							>Reporte de Contrato</v-card-title
						>
						<v-card-text>
							<textarea
								v-model="reporteContratos"
								style="
									height: 385px;
									width: 645px;
									font-size: 16px;
									font-family: 'Segoe UI';
									padding: 13px;
								"
								disabled></textarea>
						</v-card-text>
					</v-card>
				</v-container>
			</div>
			<!-- FIN REPORTE -->
		</div>

		<div>
			<div class="tabla fill-height" style="margin-top: 30px">
				<v-data-table
					:headers="headers"
					:items="contratos"
					:items-per-page="5"
					class="custom-table">
					<template v-slot:top>
						<v-toolbar flat>
							<v-card-title
								style="color: #32cc32; font-size: 30px; margin-left: -33px"
								>Lista de Reporte de Contratos</v-card-title
							>
							<v-spacer></v-spacer>

							<v-text-field
								append-icon="mdi-magnify"
								label="Buscar"
								single-line
								hide-details>
							</v-text-field>
						</v-toolbar>
					</template>
				</v-data-table>
			</div>
		</div>
	</div>
</template>

<style>
	.report-c .max-width-400 {
		max-width: 400px;
	}
	.report-c .reporte {
		width: 387px;
		padding: 4px;
	}
	.report-c .filtros {
		width: 400px;
		margin-right: auto;
	}
	.report-c .reportec {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.report-c /* .container {
		display: flex;
		justify-content: flex-end;
	} */
	.report-c textarea {
		width: 100%;
		height: 100%;
		resize: none;
		border: none;
		font-family: Arial, sans-serif;
		font-size: 14px;
		color: #333;
		background-color: #f5f5f5;
	}
	.report-c .texto-derecha {
		text-align: right;
	}
	.report-c .texto-center {
		text-align: center;
	}
	.report-c .kallpa-image {
		margin-top: 35px;
	}
	.report-c .titulo-bienvenido {
		font-size: 32px;
		font-family: Sans-serif;
		color: rgb(252, 252, 252);
	}
	.report-c .contenedor-cajas-E {
		border: 4px solid #010361;
		padding: 10px;
		margin-top: 9px;
		height: 471px;
	}
	.report-c .contenedor-cajas-F {
		border: 4px solid #010361;
		padding: 10px;
		margin-top: 9px;
		height: 100%;
		margin-left: 12px;
	}
	.report-c .contenedor-cajas-B {
		border: 4px solid #0fa14700;
		padding: 10px;
		height: 499px;
		border-radius: 10%;
	}
	.report-c .contenedor-cajas-A {
		border: 3px solid #32cc32;
		margin-top: 10px;
		padding: 10px;
	}
	.report-c .titulo {
		font-size: 32px;
		font-family: Sans-serif;
		color: rgb(252, 252, 252);
	}
	.report-c .kallpa-image {
		margin-top: 35px;
	}
	.report-c .texto-encima {
		position: absolute;
		top: 2;
		left: 0;
		right: 5;
		text-align: center;
		background-color: rgba(
			255,
			255,
			255,
			0.8
		); /* Fondo semi-transparente para legibilidad */
		padding: 2px;
		z-index: 1; /* Asegura que el texto esté por encima de los botones */
	}
	/* Estilos para los botones */
	.report-c .btn-container {
		display: flex;
		flex-direction: row-reverse;
		flex-wrap: wrap;
		justify-content: flex-end;
		/* Agrega margen superior para separar el texto de los botones si lo deseas */
		margin-top: 40px;
	}
	.report-c .btn-wide {
		width: 20px;
		margin-left: auto;
	}
	.report-c .border {
		background-color: #33cc33;
		border: 3px solid #33cc33;
		padding: 10px;
		display: inline-block;
		border-radius: 25px;
	}
	.report-c .border-bien {
		background-color: #33cc33;
		border: 3px solid #33cc33;
		padding: 10px;
		display: fixed;
		border-radius: 25px;
	}
	.report-c .floating-rectangle {
		position: absolute;
		left: 25%;
		transform: translateX(-50%);
		top: 14%;
		width: 500px;
		height: 550px;
		background-color: #33cc33;
		border: 4px solid #33cc33;
		border-radius: 30px;
		padding: 10px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	.report-c .floating-rectan {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 4%;
		width: 450px;
		height: 500px;
		background-color: #ffffff;
		border: 4px solid #ffffff;
		border-radius: 30px;
		padding: 10px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	.report-c .fill-height {
		height: 100%;
	}
	.report-c .tabla {
		width: 97%;
		margin-left: 27px;
	}
	.report-c .custom-table thead th {
		background-color: rgb(11, 13, 105);
		color: #ffffff !important;
	}
</style>
<script src="./ReporteContrato.js"></script>
