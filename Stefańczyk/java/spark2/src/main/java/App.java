import com.fasterxml.uuid.Generators;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import spark.Request;
import spark.Response;

import java.lang.reflect.Array;
import java.lang.reflect.Type;
import java.util.*;

import spark.Spark;

import static spark.Spark.*;

public class App {
    public static ArrayList<Car> cars = new ArrayList<>();
    public static String Tabela;
   static ArrayList<String> samplecars = new ArrayList<>(){{
       add("BMW");
       add("Fiat");
       add("Opel");
       add("Audi");
       add("Peugeot");
       add("Renault");
   }};
    static ArrayList<String> sampleyears = new ArrayList<>(){{
        add("1990");
        add("1991");
        add("1992");
        add("1993");
        add("1994");
        add("1995");
        add("1996");
        add("1997");
        add("1998");
        add("1999");
        add("2000");
        add("2001");
        add("2002");
        add("2003");
        add("2004");
        add("2005");
        add("2006");
        add("2007");
        add("2008");
        add("2009");
        add("2010");
    }};
    static ArrayList<String> samplecolors = new ArrayList<>(){{
        add("red");
        add("green");
        add("blue");
        add("orange");
        add("pink");
    }};
    static ArrayList<Car> cars2 = new ArrayList<>();
    public static void main(String[] args) {
        staticFiles.location("/public");
        port(5000);
        post("/add", (req, res) -> add(req, res));
        post("/json", (req, res) -> admin(req, res));
    }

    static String add(Request req, Response res) {
        System.out.println(req.body());
        Gson gson = new Gson();
        Car car = gson.fromJson(req.body(), Car.class);
        UUID uuid = Generators.randomBasedGenerator().generate();
        car.setId(cars.size() + 1);
        car.setUuid(uuid);
        cars.add(car);
        System.out.println(cars);
        res.type("application/json");
        return gson.toJson(car, Car.class);
    }
    static String admin(Request req, Response res) {
        Gson gson = new Gson();
        for(int x = 0; x < 10; x++) {
            int randomcar = (int) (Math.random() * samplecars.size());
            int randomcolor = (int) (Math.random() * samplecolors.size());
            int randomyear = (int) (Math.random() * sampleyears.size());
            ArrayList<Airbag> aribags = new ArrayList<>(){{
                add(new Airbag("kierowca",Randairbag()));
                add(new Airbag("pasażer",Randairbag()));
                add(new Airbag("kanapa",Randairbag()));
                add(new Airbag("boczne",Randairbag()));
            }};
            Car car = new Car(samplecars.get(randomcar), aribags, sampleyears.get(randomyear), samplecolors.get(randomcolor));
            UUID uuid = Generators.randomBasedGenerator().generate();
            car.setId(cars2.size() + 1);
            car.setUuid(uuid);
            cars2.add(car);
        }
        res.type("application/json");
        Type listType = new TypeToken<ArrayList<Car>>() {}.getType();
        return gson.toJson(cars2, listType);
    }
    static Boolean Randairbag(){
        Random random = new Random();
        Boolean randbool = random.nextBoolean();
        return randbool;
    }
}

 class Car {
    private Integer id;
    private UUID uuid;
    private String model;
    private ArrayList<Airbag> airbags;
    private String year;
    private String color;

     public Car(String model, ArrayList<Airbag> airbags, String year, String color) {
         this.model = model;
         this.color = color;
         this.airbags = airbags;
         this.year = year;
     }

     public Integer getId() {
         return id;
     }

     public void setId(Integer id) {
         this.id = id;
     }

     public UUID getUuid() {
         return uuid;
     }

     public ArrayList<Airbag> getAirbags() {
         return airbags;
     }

     public void setAirbags(ArrayList<Airbag> airbags) {
         this.airbags = airbags;
     }

     public void setUuid(UUID uuid) {
         this.uuid = uuid;
     }

     public String getModel() {
         return model;
     }

     public void setModel(String model) {
         this.model = model;
     }

     public String getColor() {
         return color;
     }

     public void setColor(String color) {
         this.color = color;
     }

     public String getYear() {
         return year;
     }

     public void setYear(String year) {
         this.year = year;
     }
 }
 class Airbag {
    private String des;
    private boolean value;
    public Airbag(String des, boolean value){
        this.des = des;
        this.value = value;
    }
}
