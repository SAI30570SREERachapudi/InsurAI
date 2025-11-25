package com.example.insurai_backend.service;
import com.example.insurai_backend.model.PolicyPurchase;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;

@Service
public class ReceiptService {

    public String generateReceipt(PolicyPurchase purchase) {
        try {
            String folder = "receipts/";
            File dir = new File(folder);
            if (!dir.exists()) dir.mkdirs();

            String filePath = folder + "purchase_" + purchase.getId() + ".pdf";

            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream(filePath));

            document.open();

            // Title
            Font titleFont = new Font(Font.HELVETICA, 22, Font.BOLD);
            Paragraph p1 = new Paragraph("INSURAI - POLICY PURCHASE RECEIPT\n\n", titleFont);
            p1.setAlignment(Element.ALIGN_CENTER);
            document.add(p1);

            // User Info
            Font normal = new Font(Font.HELVETICA, 12);

            document.add(new Paragraph("Customer Name: " + purchase.getUser().getName(), normal));
            document.add(new Paragraph("Email: " + purchase.getUser().getEmail(), normal));
            document.add(new Paragraph("\n"));

            // Policy Info
            document.add(new Paragraph("Policy Name: " + purchase.getPolicy().getPolicyName(), normal));
            document.add(new Paragraph("Policy Type: " + purchase.getPolicy().getPolicyType(), normal));
            document.add(new Paragraph("Premium: ₹" + purchase.getPolicy().getPremium(), normal));
            document.add(new Paragraph("Coverage: ₹" + purchase.getPolicy().getCoverageAmount(), normal));
            document.add(new Paragraph("Purchase Date: " + purchase.getPurchaseDate(), normal));
            document.add(new Paragraph("Next Premium Due: " + purchase.getNextPremiumDue(), normal));
            document.add(new Paragraph("\n"));

            // Nominee
            document.add(new Paragraph("Nominee Details:", new Font(Font.HELVETICA, 14, Font.BOLD)));
            document.add(new Paragraph("Name: " + purchase.getNomineeName(), normal));
            document.add(new Paragraph("Relation: " + purchase.getNomineeRelation(), normal));
            document.add(new Paragraph("Phone: " + purchase.getNomineePhone(), normal));
            document.add(new Paragraph("Age: " + purchase.getNomineeAge(), normal));
            document.add(new Paragraph("\n"));

            document.add(new Paragraph("Status: " + purchase.getStatus(), normal));

            document.close();
            return filePath;

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate receipt PDF", e);
        }
    }
}
