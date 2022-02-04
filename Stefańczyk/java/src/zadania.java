class zadanie {
    public static void main(String[] args) {
        System.out.println(isBigger(4));
        System.out.println(isBigger(110));
        System.out.println(printString());
        System.out.println(rectArea(2,4));
        makeSomething();
        makeSomething2();
    }

    static boolean isBigger(int x) {
        return x > 100;
    }

    static int rectArea(int a, int b){
        return a * b;
    }

    static String printString(){
        return "any string";
    }

    static void makeSomething() {
        System.out.println("makeSomething");
    }

    static void makeSomething2() {
        System.out.println("makeSomething2");
    }
}


