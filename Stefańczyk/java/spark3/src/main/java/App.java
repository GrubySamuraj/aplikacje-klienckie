import com.fasterxml.uuid.Generators;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import spark.Request;
import spark.Response;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Array;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;


import static spark.Spark.*;

public class App {
    public static ArrayList<Car> cars = new ArrayList<>();
   static ArrayList<String> samplecars = new ArrayList<>(){{
       add("BMW");
       add("Fiat");
       add("Opel");
       add("Audi");
       add("Peugeot");
       add("Renault");
   }};
   static ArrayList<Integer>SampleVAT = new ArrayList<>(){{
      add(0);
      add(7);
      add(22);
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
    static ArrayList<Integer> sampleyears2 = new ArrayList<>(){{
        add(1990);
        add(1991);
        add(1992);
        add(1993);
        add(1994);
        add(1995);
        add(1996);
        add(1997);
        add(1998);
        add(1999);
        add(2000);
        add(2001);
        add(2002);
        add(2003);
        add(2004);
        add(2005);
        add(2006);
        add(2007);
        add(2008);
        add(2009);
        add(2010);
        add(2011);
        add(2012);
        add(2013);
        add(2014);
        add(2015);
        add(2016);
        add(2017);
        add(2018);
        add(2019);
        add(2020);
        add(2021);
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
        port(getHerokuPort());
        post("/add", (req, res) -> add(req, res));
        post("/json", (req, res) -> admin(req, res));
        post("/getTable", (req, res) -> allcars(req, res));
        post("/pdf",(req,res)->pdf(req,res));
        post("/delete",(req,res)->deleteCar(req,res));
        post("/update",(req,res)->updateCar(req,res));
        post("/get",(req,res)->morecars(req,res));
        post("/invoiceAll",(req,res)->invoiceAll(req,res));
        post("/invoiceYear",(req,res)->invoiceYear(req,res));
        post("/invoiceRange",(req,res)->invoiceRange(req,res));
        get("/invoices",(req,res)->pdf2(req,res));
    }
    static int getHerokuPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567;
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
            car.setVat(Helpers.RandomVat());
            car.setCena(Helpers.RandomCena());
            int month = Helpers.randomMonth();
            int year = Helpers.randomYear();
            int day = Helpers.randomDay(month,year);
            String data = Helpers.makeDate(day,month,year);
            car.setData(data);
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
    static String pdf(Request req, Response res){
        int body = Integer.parseInt(req.body());
        Document document = new Document(); // dokument pdf
        String path = "./target/classes/public/invoices/" + cars2.get(body).getUuid() + ".pdf"; // lokalizacja zapisu
        try {
            PdfWriter.getInstance(document, new FileOutputStream(path));
        } catch (DocumentException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        document.open();
        Font title = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, BaseColor.BLACK);
        Font model = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, BaseColor.BLACK);
        Font kolor = FontFactory.getFont(FontFactory.HELVETICA, 16, BaseColor.BLACK);
        System.out.println(cars2.get(body).getColor());
        if(cars2.get(body).getColor() == "red"){
            kolor = FontFactory.getFont(FontFactory.HELVETICA, 16, BaseColor.RED);
        }
        else if(cars2.get(body).getColor() == "green"){
            kolor = FontFactory.getFont(FontFactory.HELVETICA, 16, BaseColor.GREEN);
        }
        else if(cars2.get(body).getColor() == "blue"){
            kolor = FontFactory.getFont(FontFactory.HELVETICA, 16, BaseColor.BLUE);
        }
        else if(cars2.get(body).getColor() == "orange"){
            kolor = FontFactory.getFont(FontFactory.HELVETICA, 16, BaseColor.ORANGE);
        }
        else if(cars2.get(body).getColor() == "pink"){
            kolor = FontFactory.getFont(FontFactory.HELVETICA, 16, BaseColor.PINK);
        }
        Font font = FontFactory.getFont(FontFactory.HELVETICA, 16, BaseColor.BLACK);
        Chunk chunk = new Chunk("FAKTURA dla: " +cars2.get(body).getUuid() , title);
        Paragraph chunk1 = new Paragraph("model: " +cars2.get(body).getModel() , model);
        Paragraph chunk2 = new Paragraph("kolor: " +cars2.get(body).getColor() , kolor);
        Paragraph chunk3 = new Paragraph("rok: " +cars2.get(body).getYear() , font);
        Paragraph chunk4 = new Paragraph("poduszka: " +cars2.get(body).getAirbags().get(0).getDes() + " - " + cars2.get(body).getAirbags().get(0).isValue() , font);
        Paragraph chunk5 = new Paragraph("poduszka: " +cars2.get(body).getAirbags().get(1).getDes() + " - " + cars2.get(body).getAirbags().get(1).isValue() , font);
        Paragraph chunk6 = new Paragraph("poduszka: " +cars2.get(body).getAirbags().get(2).getDes() + " - " + cars2.get(body).getAirbags().get(2).isValue() , font);
        Paragraph chunk7 = new Paragraph("poduszka: " +cars2.get(body).getAirbags().get(3).getDes() + " - " + cars2.get(body).getAirbags().get(3).isValue() , font);
        System.out.println(cars2.get(body).getAirbags());
        try {
            document.add(chunk);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        try {
            document.add(chunk1);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        try {
            document.add(chunk2);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        try {
            document.add(chunk3);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        try {
            document.add(chunk4);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        try {
            document.add(chunk5);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        try {
            document.add(chunk6);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        try {
            document.add(chunk7);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        try {
            Image img = Image.getInstance("./target/classes/public/img/" + cars2.get(body).getModel() + ".jpg");
            document.add(img);
        } catch (BadElementException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        document.close();
        res.type("plain/text");
        path = "/invoices/" + cars2.get(body).getUuid() + ".pdf";
        return path;
    }
    static String pdf2(Request req, Response res) {
        res.type("application/octet-stream");
        res.header("Content-Disposition", "attachment; filename=" + req.queryParams("name")); // nagłówek
        System.out.println(req.body());
        System.out.println(req.queryParams("name"));
        OutputStream outputStream = null;
        try {
            outputStream = res.raw().getOutputStream();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String path1 = "./target/classes/public/invoices/" + req.queryParams("name");
        try {
            outputStream.write(Files.readAllBytes(Path.of(path1)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return "Success";
    }
    static String allcars(Request req, Response res){
        Gson gson = new Gson();
        res.type("application/json");
        Type listType = new TypeToken<ArrayList<Car>>() {}.getType();
        return gson.toJson(cars, listType);
    }

    static String deleteCar(Request req, Response res) {
        int id = Integer.parseInt(req.body());
        System.out.println(req.body());
        System.out.println(cars.get(id));
        cars.remove(id);
        return "removed";
    }
    static String updateCar(Request req, Response res){
        System.out.println(req.body());
        Gson gson = new Gson();
        Car car1 = gson.fromJson(req.body(), Car.class);
        int id = car1.getId();
        String year = car1.getYear();
        String model = car1.getModel();
        cars.get(id).setYear(year);
        cars.get(id).setModel(model);
        return "edited successfully";
    }
    static String morecars(Request req, Response res) {
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
            car.setCena(Helpers.RandomCena());
            int month = Helpers.randomMonth();
            int year = Helpers.randomYear();
            int day = Helpers.randomDay(month,year);
            car.setData(Helpers.makeDate(day,month,year));
            car.setVat(Helpers.RandomVat());
            UUID uuid = Generators.randomBasedGenerator().generate();
            car.setId(cars2.size() + 1);
            car.setUuid(uuid);
            cars2.add(car);
        }
        res.type("application/json");
        Type listType = new TypeToken<ArrayList<Car>>() {}.getType();
        return gson.toJson(cars2, listType);
    }
    static String invoiceAll(Request req, Response res) {
        long timestamp = System.currentTimeMillis();
        Invoice faktura = new Invoice(timestamp,"Faktura za wszystkie auta","firma sprzedająca auta","nabywca",cars2,"invoice_all_cars");
        String number = faktura.CreateNumber();
        String path = faktura.faktura(number);
        return path;
    }
    static String invoiceYear(Request req, Response res){
        long timestamp = System.currentTimeMillis();
        System.out.println(req.body());
        String year = req.body();
        ArrayList<Car> carsYear = new ArrayList<>();
        for(int x = 0; x < cars2.size(); x++){
            System.out.println(cars2.get(x).getYear().equals(year));
            if(cars2.get(x).getYear().equals(year)){
                carsYear.add(cars2.get(x));
            }
        }
        System.out.println(carsYear.toString());
        Invoice fakturaYear = new Invoice(timestamp,"Faktura za auta z roku " + year,"firma sprzedająca auta","nabywca",carsYear,"invoice_all_cars_by_year");
        String number = fakturaYear.CreateNumber();
        String path = fakturaYear.faktura(number);
        return path;
    }
    static String invoiceRange(Request req, Response res){
        Gson gson = new Gson();
        Range range = gson.fromJson(req.body(), Range.class);
        long timestamp = System.currentTimeMillis();
        ArrayList<Car> carsRange = new ArrayList<>();
        for(int x = 0; x < cars2.size(); x++){
            if(cars2.get(x).getCena() <= range.getMax() && cars2.get(x).getCena() >= range.getMin()){
                carsRange.add(cars2.get(x));
            }
        }
        System.out.println(carsRange.toString());
        Invoice fakturaRange = new Invoice(timestamp,"Faktura za auta z zakresu: " + String.valueOf(range.getMin()) + "-"+ String.valueOf(range.getMax()) + "PLN","firma sprzedająca auta","nabywca",carsRange,"invoice_all_cars_by_price");
        String number = fakturaRange.CreateNumber();
        String path = fakturaRange.faktura(number);
        return path;
    }
}
class Range{
    private int min;
    private int max;
    public Range(int min,int max){
        this.min = min;
        this.max = max;
    }

    public int getMin() {
        return min;
    }

    public void setMin(int min) {
        this.min = min;
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
    }
}
class Car {
    private Integer id;
    private UUID uuid;
    private String model;
    private ArrayList<Airbag> airbags;
    private String year;
    private String color;
    private int cena;
    private String data;
    private int vat;

     public Car(String model, ArrayList<Airbag> airbags, String year, String color) {
         this.model = model;
         this.color = color;
         this.airbags = airbags;
         this.year = year;
     }
     public String getData() {
         return data;
     }

     public void setData(String data) {
         this.data = data;
     }

     public int getVat() {
         return vat;
     }

     public void setVat(int vat) {
         this.vat = vat;
     }

     public int getCena() {
         return cena;
     }

     public void setCena(int cena) {
         this.cena = cena;
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

     public String getDes() {
         return des;
     }

     public void setDes(String des) {
         this.des = des;
     }

     public boolean isValue() {
         return value;
     }

     public void setValue(boolean value) {
         this.value = value;
     }
 }
class Helpers {
    public static int randomDay(int month,int year){
        int day = 0;
        if(month == 2 && year % 4 == 0) {
            day = (int) (Math.random() * 29) + 1;
        }
        else if(month == 2){
            day = (int) (Math.random() * 28) + 1;
        }
        else if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
            day = (int) (Math.random() * 31) + 1;
        }
        else{
            day = (int) (Math.random() * 30) + 1;
        }
        return day;
    }
    public static int randomMonth(){
        int month = (int) (Math.random() * 12) + 1;
        System.out.println(month);
        return month;
    }
    public static int randomYear(){
        int indexyear = (int) (Math.random() * App.sampleyears2.size());
        int year = App.sampleyears2.get(indexyear);
        System.out.println(year);
        return year;
    }
    public static int RandomCena(){
        int max = 50000;
        int min = 10000;
        int range = max - min + 1;
        return (int)(Math.random() * range) + min;
    }
    public static int RandomVat(){
        return App.SampleVAT.get((int)(Math.random() * App.SampleVAT.size()));
    }
    public static String makeDate(int day, int month,int year){
        return String.valueOf(day) + "/" + String.valueOf(month) + "/" + String.valueOf(year);
    }
}
class CustomDate {
    private int day;
    private int month;
    private int year;
    CustomDate(int day,int month,int year){
        this.day = day;
        this.month = month;
        this.year = year;
    }
    String ConstructDate(){
        return String.valueOf(this.day) + "/"+ String.valueOf(this.month) +"/" +String.valueOf(this.year);
    }
    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
class Invoice{
    private long time;
    private String title;
    private String seller;
    private String buyer;
    private long timestamp;
    private ArrayList<Car> list;
    private String dirname;
    Invoice(long timestamp,String title,String seller,String buyer,ArrayList<Car> list,String dirname){
        this.timestamp = timestamp;
        this.dirname = dirname;
        this.title = title;
        this.seller = seller;
        this.buyer = buyer;
        this.list = list;
    }
    public String CreateNumber(){
        String number =String.valueOf(new Timestamp(this.timestamp));
        number = number.substring(0,16);
        String[] arrOfStr = String.valueOf(number).split("-|:| ", 10);
        number = String.join("/",arrOfStr);
        return number;
    }
    public int Netto(){
        int cena = 0;
        for(int x = 0; x < this.list.size();x++){
            cena += this.list.get(x).getCena();
        }
        return cena;
    }
    public double Brutto(int x){
        double cena = 0;
        cena += this.list.get(x).getCena() + (this.list.get(x).getCena() * this.list.get(x).getVat()/100);
        return cena;
    }
    public String faktura(String number){
        Document document = new Document();
        String path = "./target/classes/public/invoices/"+this.dirname + "_" + String.valueOf(this.timestamp) + ".pdf";
        try {
            PdfWriter.getInstance(document, new FileOutputStream(path));
        } catch (DocumentException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        document.open();
        Font title = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, BaseColor.BLACK);
        Font title2 = FontFactory.getFont(FontFactory.HELVETICA, 16, BaseColor.RED);
        Font font = FontFactory.getFont(FontFactory.HELVETICA, 16, BaseColor.BLACK);
        Font tableFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);
        Chunk chunk = new Chunk("FAKTURA dla VAT: " + number, title);
        Paragraph chunk1 = new Paragraph("Nabywca: " + this.buyer + " Sprzedawca: " + this.seller , font);
        Paragraph chunk2 = new Paragraph(this.title , title2);
        PdfPTable table = new PdfPTable(4);
        PdfPCell a = new PdfPCell(new Phrase("lp", tableFont));
        table.addCell(a);
        PdfPCell b = new PdfPCell(new Phrase("cena", tableFont));
        table.addCell(b);
        PdfPCell c = new PdfPCell(new Phrase("vat", tableFont));
        table.addCell(c);
        PdfPCell d = new PdfPCell(new Phrase("wartosc", tableFont));
        table.addCell(d);
        for(int x = 0; x < this.list.size(); x++){
            PdfPCell f = new PdfPCell(new Phrase(String.valueOf(x + 1), tableFont));
            table.addCell(f);
            PdfPCell g = new PdfPCell(new Phrase(String.valueOf(this.list.get(x).getCena()) + ".0", tableFont));
            table.addCell(g);
            PdfPCell h = new PdfPCell(new Phrase(String.valueOf(this.list.get(x).getVat()) + "%", tableFont));
            table.addCell(h);
            PdfPCell i = new PdfPCell(new Phrase(String.valueOf(Brutto(x)), tableFont));
            table.addCell(i);
        }
        Paragraph chunk3 = new Paragraph("DO ZAPLATY:" + String.valueOf(Netto()) + ".0PLN" , title);
        try {
            document.add(chunk);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        try {
            document.add(chunk1);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        try {
            document.add(chunk2);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        try {
            document.add(table);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        try {
            document.add(chunk3);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        document.close();
        return path;
    }
    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public ArrayList<Car> getList() {
        return list;
    }

    public void setList(ArrayList<Car> list) {
        this.list = list;
    }
}