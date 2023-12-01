from flask import Flask, request, jsonify 
from flask import request
from flask_cors import CORS 
import mysql.connector 


app = Flask(__name__) 
CORS(app)

class Menu:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect( 
            host= host, 
            user='root', 
            password=''

            )
        
        self.cursor = self.conn.cursor()

        try: 
            self.cursor.execute(f"USE {'menuplatos'}") 
        except mysql.connector.Error as err: 
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR: 
                self.cursor.execute(f"CREATE DATABASE {'menuplatos'}") 
                self.conn.database = database 
            else: 
                raise err
            
            self.cursor.execute('''CREATE TABLE IF NOT EXISTS platos ( 
                                codigo INT, 
                                descripcion VARCHAR(255) NOT NULL, 
                                cantidad INT NOT NULL, 
                                precio DECIMAL(10, 2) NOT NULL)''') 
            self.conn.commit()
            self.cursor.close() 
            self.cursor = self.conn.cursor(dictionary=True)

def listar_platos(self): 
    self.cursor.execute("SELECT * FROM platos") 
    platos = self.cursor.fetchall() 
    return platos

def consultar_plato(self, codigo): 
    self.cursor.execute(f"SELECT * FROM platos WHERE codigo = {codigo}") 
    return self.cursor.fetchone()

def mostrar_plato(self, codigo): 
    plato = self.consultar_plato(codigo) 
    if plato: 
        print("-" * 40) 
        print(f"Código.....: {plato['codigo']}")
        print(f"Descripción: {plato['descripcion']}") 
        print(f"Cantidad...: {plato['cantidad']}") 
        print(f"Precio.....: {plato['precio']}")  
        print("-" * 40) 
    else: print("Plato no encontrado.")

def agregar_plato(self, codigo, descripcion, cantidad, precio): 
    self.cursor.execute(f"SELECT * FROM platos WHERE codigo = {codigo}") 
    plato_existe = self.cursor.fetchone() 
    if plato_existe:
        return False
    sql = "INSERT INTO platos (codigo, descripcion, cantidad, precio) VALUES (%s, %s, %s, %s, %s, %s)"
    valores = (codigo, descripcion, cantidad, precio) 
    self.cursor.execute(sql, valores) 
    self.conn.commit() 
    return True

def modificar_plato(self, codigo, nueva_descripcion, nueva_cantidad, nuevo_precio): 
    sql = "UPDATE platos SET descripcion = %s, cantidad = %s, precio = %s WHERE codigo = %s" 
    valores = (nueva_descripcion, nueva_cantidad, nuevo_precio, codigo)
    self.cursor.execute(sql, valores) 
    self.conn.commit() 
    return self.cursor.rowcount > 0



def eliminar_plato(self, codigo): 
    self.cursor.execute(f"DELETE FROM platos WHERE codigo = {codigo}") 
    self.conn.commit() 
    return self.cursor.rowcount > 0            

menu = Menu (host='localhost', user = 'root', password = '', database = 'menuplatos')

@app.route("/platos", methods=["GET"]) 
def listar_platos(): 
    platos = menu.listar_platos() 
    return jsonify(platos) 



@app.route("/platos/<int:codigo>", methods=["GET"]) 
def mostrar_plato(codigo): 
    plato = menu.consultar_plato(codigo) 
    if plato: 
        return jsonify(plato) 
    else: 
        return "Plato no encontrado", 404
    

@app.route("/platos", methods=["POST"]) 
def agregar_plato(): 
    codigo = request.form['codigo'] 
    descripcion = request.form['descripcion'] 
    cantidad = request.form['cantidad'] 
    precio = request.form['precio']  
    if menu.agregar_plato(codigo, descripcion, cantidad, precio): 
        return jsonify({"mensaje": "Plato agregado"}), 201 
    else: 
        return jsonify({"mensaje": "Plato ya existe"}), 400



@app.route("/platos/<int:codigo>", methods=["PUT"]) 
def modificar_plato(codigo): 
    nueva_descripcion = request.form.get("descripcion") 
    nueva_cantidad = request.form.get("cantidad") 
    nuevo_precio = request.form.get("precio")  
    if menu.modificar_plato(codigo, nueva_descripcion, nueva_cantidad, nuevo_precio): 
        return jsonify({"mensaje": "Plato modificado"}), 200 
    else: 
        return jsonify({"mensaje": "Plato no encontrado"}), 404
    


@app.route("/platos/<int:codigo>", methods=["DELETE"]) 
def eliminar_plato(codigo): 
    plato = menu.consultar_plato(codigo)    
    if plato:
        if menu.eliminar_plato(codigo): 
            return jsonify({"mensaje": "Plato eliminado"}), 200 
        else: 
            return jsonify({"mensaje": "Error al eliminar el plato"}), 500 
    else: 
        return jsonify({"mensaje": "Plato no encontrado"}), 404
    

if __name__ == "__main__": 
    app.run(debug=True)