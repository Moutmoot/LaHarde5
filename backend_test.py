#!/usr/bin/env python3
"""
Backend API Tests for La Harde Roller Derby Club
Tests all backend endpoints with realistic French data
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from frontend .env file
BACKEND_URL = "https://c6b8ae58-f72a-4f50-ad4c-dd3f15521ac9.preview.emergentagent.com/api"

def test_health_check():
    """Test the health check endpoint"""
    print("🏥 Testing Health Check API...")
    try:
        response = requests.get(f"{BACKEND_URL}/health", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "healthy":
                print("✅ Health check passed")
                return True
            else:
                print("❌ Health check failed - invalid response")
                return False
        else:
            print(f"❌ Health check failed - status code {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Health check failed - error: {str(e)}")
        return False

def test_member_registration():
    """Test member registration API with realistic French data"""
    print("\n👥 Testing Member Registration API...")
    
    # Test data with realistic French names and details
    test_members = [
        {
            "prenom": "Marie",
            "nom": "Dubois",
            "email": "marie.dubois@email.fr",
            "telephone": "06 12 34 56 78",
            "age": 25,
            "niveau_experience": "débutant",
            "message": "Je suis très motivée pour rejoindre l'équipe!"
        },
        {
            "prenom": "Sophie",
            "nom": "Martin",
            "email": "sophie.martin@gmail.com",
            "telephone": "07 98 76 54 32",
            "age": 30,
            "niveau_experience": "intermédiaire"
        }
    ]
    
    success_count = 0
    
    for i, member_data in enumerate(test_members, 1):
        print(f"\n  Test {i}: Registering {member_data['prenom']} {member_data['nom']}")
        try:
            response = requests.post(
                f"{BACKEND_URL}/inscription",
                json=member_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            print(f"  Status Code: {response.status_code}")
            print(f"  Response: {response.json()}")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("registration_id"):
                    print(f"  ✅ Registration successful for {member_data['prenom']}")
                    success_count += 1
                else:
                    print(f"  ❌ Registration failed - invalid response structure")
            else:
                print(f"  ❌ Registration failed - status code {response.status_code}")
                
        except Exception as e:
            print(f"  ❌ Registration failed - error: {str(e)}")
    
    print(f"\n📊 Member Registration Results: {success_count}/{len(test_members)} successful")
    return success_count == len(test_members)

def test_contact_form():
    """Test contact form API"""
    print("\n📧 Testing Contact Form API...")
    
    contact_data = {
        "nom": "Jean Dupont",
        "email": "jean.dupont@email.fr",
        "sujet": "Demande d'informations",
        "message": "Bonjour, je souhaiterais avoir plus d'informations sur les entraînements de roller derby. Merci!"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/contact",
            json=contact_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                print("✅ Contact form submission successful")
                return True
            else:
                print("❌ Contact form failed - invalid response")
                return False
        else:
            print(f"❌ Contact form failed - status code {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Contact form failed - error: {str(e)}")
        return False

def test_event_registration():
    """Test event registration API"""
    print("\n🎉 Testing Event Registration API...")
    
    event_data = {
        "nom": "Claire Moreau",
        "email": "claire.moreau@email.fr",
        "telephone": "06 11 22 33 44",
        "nom_evenement": "Tournoi de Printemps 2025"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/evenement/inscription",
            json=event_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                print("✅ Event registration successful")
                return True
            else:
                print("❌ Event registration failed - invalid response")
                return False
        else:
            print(f"❌ Event registration failed - status code {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Event registration failed - error: {str(e)}")
        return False

def test_club_statistics():
    """Test club statistics API"""
    print("\n📈 Testing Club Statistics API...")
    
    try:
        response = requests.get(f"{BACKEND_URL}/stats", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["total_inscriptions", "total_contacts", "total_evenements", "membres_actifs"]
            
            if all(field in data for field in required_fields):
                print("✅ Statistics API successful - all required fields present")
                print(f"  📊 Total Inscriptions: {data['total_inscriptions']}")
                print(f"  📧 Total Contacts: {data['total_contacts']}")
                print(f"  🎉 Total Events: {data['total_evenements']}")
                print(f"  👥 Active Members: {data['membres_actifs']}")
                return True
            else:
                missing_fields = [field for field in required_fields if field not in data]
                print(f"❌ Statistics API failed - missing fields: {missing_fields}")
                return False
        else:
            print(f"❌ Statistics API failed - status code {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Statistics API failed - error: {str(e)}")
        return False

def test_validation_errors():
    """Test API validation and error handling"""
    print("\n🔍 Testing Validation and Error Handling...")
    
    # Test invalid member registration (missing required fields)
    print("  Testing invalid member registration...")
    invalid_member = {
        "prenom": "Test",
        # Missing required fields
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/inscription",
            json=invalid_member,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 422:  # FastAPI validation error
            print("  ✅ Validation correctly rejected invalid member data")
            validation_passed = True
        else:
            print(f"  ❌ Expected validation error, got status {response.status_code}")
            validation_passed = False
            
    except Exception as e:
        print(f"  ❌ Validation test failed - error: {str(e)}")
        validation_passed = False
    
    # Test invalid email format
    print("  Testing invalid email format...")
    invalid_email_member = {
        "prenom": "Test",
        "nom": "User",
        "email": "invalid-email",
        "telephone": "0123456789",
        "age": 25,
        "niveau_experience": "débutant"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/inscription",
            json=invalid_email_member,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 422:  # FastAPI validation error
            print("  ✅ Email validation correctly rejected invalid email")
            email_validation_passed = True
        else:
            print(f"  ❌ Expected email validation error, got status {response.status_code}")
            email_validation_passed = False
            
    except Exception as e:
        print(f"  ❌ Email validation test failed - error: {str(e)}")
        email_validation_passed = False
    
    return validation_passed and email_validation_passed

def main():
    """Run all backend API tests"""
    print("🚀 Starting Backend API Tests for La Harde Roller Derby Club")
    print(f"🌐 Testing against: {BACKEND_URL}")
    print("=" * 60)
    
    test_results = {}
    
    # Run all tests
    test_results["health"] = test_health_check()
    test_results["member_registration"] = test_member_registration()
    test_results["contact_form"] = test_contact_form()
    test_results["event_registration"] = test_event_registration()
    test_results["statistics"] = test_club_statistics()
    test_results["validation"] = test_validation_errors()
    
    # Summary
    print("\n" + "=" * 60)
    print("📋 TEST SUMMARY")
    print("=" * 60)
    
    passed = 0
    total = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
        if result:
            passed += 1
    
    print(f"\n🎯 Overall Result: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend APIs are working correctly!")
        return True
    else:
        print("⚠️  Some backend APIs have issues that need attention.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)